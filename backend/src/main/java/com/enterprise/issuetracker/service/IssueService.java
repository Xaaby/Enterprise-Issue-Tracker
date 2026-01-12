package com.enterprise.issuetracker.service;

import com.enterprise.issuetracker.entity.Issue;
import com.enterprise.issuetracker.entity.IssueStatus;
import com.enterprise.issuetracker.entity.Priority;
import com.enterprise.issuetracker.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues(String search, String status, String priority, String assignee, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Issue> issuePage = issueRepository.findAll(pageable);
        List<Issue> issues = issuePage.getContent();
        
        // Simple filtering (can be improved with JPA Specifications)
        if (search != null && !search.isEmpty()) {
            issues = issues.stream()
                    .filter(i -> i.getTitle().toLowerCase().contains(search.toLowerCase()) ||
                               (i.getKey() != null && i.getKey().contains(search)) ||
                               (i.getAssignedTo() != null && i.getAssignedTo().toLowerCase().contains(search.toLowerCase())))
                    .collect(Collectors.toList());
        }
        if (status != null && !status.isEmpty()) {
            issues = issues.stream()
                    .filter(i -> i.getStatus().name().equals(status))
                    .collect(Collectors.toList());
        }
        if (priority != null && !priority.isEmpty()) {
            issues = issues.stream()
                    .filter(i -> i.getPriority().name().equals(priority))
                    .collect(Collectors.toList());
        }
        if (assignee != null && !assignee.isEmpty()) {
            issues = issues.stream()
                    .filter(i -> i.getAssignedTo() != null && i.getAssignedTo().equals(assignee))
                    .collect(Collectors.toList());
        }
        
        return issues;
    }

    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    public Issue updateIssue(Long id, Issue issueDetails) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setTitle(issueDetails.getTitle());
        issue.setDescription(issueDetails.getDescription());
        issue.setStatus(issueDetails.getStatus());
        issue.setPriority(issueDetails.getPriority());
        issue.setCategory(issueDetails.getCategory());
        issue.setAssignedTo(issueDetails.getAssignedTo());
        issue.setDueDate(issueDetails.getDueDate());

        return issueRepository.save(issue);
    }

    public Issue changeStatus(Long id, IssueStatus status) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setStatus(status);
        return issueRepository.save(issue);
    }

    public Issue assignIssue(Long id, String assignedTo) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setAssignedTo(assignedTo);
        return issueRepository.save(issue);
    }
}
