import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';
import { IssueStatus } from '../models/issue.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = `${environment.apiUrl}/issues`;

  constructor(private http: HttpClient) { }

  getIssues(
    search?: string,
    status?: string,
    priority?: string,
    assignee?: string,
    page: number = 0,
    size: number = 10
  ): Observable<Issue[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);
    if (assignee) params = params.set('assignee', assignee);
    
    return this.http.get<Issue[]>(this.apiUrl, { params });
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
