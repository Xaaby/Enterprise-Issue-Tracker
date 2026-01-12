package com.enterprise.issuetracker.controller;

import com.enterprise.issuetracker.entity.Issue;
import com.enterprise.issuetracker.entity.IssueStatus;
import com.enterprise.issuetracker.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:4200")
public class IssueController {

    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        Issue createdIssue = issueService.createIssue(issue);
        return new ResponseEntity<>(createdIssue, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .map(issue -> new ResponseEntity<>(issue, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable Long id, @RequestBody Issue issue) {
        try {
            Issue updatedIssue = issueService.updateIssue(id, issue);
            return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Issue> changeStatus(@PathVariable Long id, @RequestBody StatusRequest request) {
        try {
            Issue updatedIssue = issueService.changeStatus(id, request.getStatus());
            return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<Issue> assignIssue(@PathVariable Long id, @RequestBody AssignRequest request) {
        try {
            Issue updatedIssue = issueService.assignIssue(id, request.getAssignedTo());
            return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Inner classes for request bodies
    public static class StatusRequest {
        private IssueStatus status;

        public IssueStatus getStatus() {
            return status;
        }

        public void setStatus(IssueStatus status) {
            this.status = status;
        }
    }

    public static class AssignRequest {
        private String assignedTo;

        public String getAssignedTo() {
            return assignedTo;
        }

        public void setAssignedTo(String assignedTo) {
            this.assignedTo = assignedTo;
        }
    }
}
