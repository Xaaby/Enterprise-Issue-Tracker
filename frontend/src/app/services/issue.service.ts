import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';
import { IssueStatus } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:8080/api/issues';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  updateStatus(id: number, status: IssueStatus): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}/status`, { status });
  }

  assignIssue(id: number, assignedTo: string): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }
}
