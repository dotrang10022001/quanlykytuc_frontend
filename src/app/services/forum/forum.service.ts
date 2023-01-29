import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forum } from 'src/app/models/forum.model';
import { ForumComment } from 'src/app/models/forum-comment.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  // baseUrl: string="https://65.108.79.164:7201/api/services/app/Forum/";
  baseUrl: string="https://65.108.79.164:7201/api/services/app/Forum/";


  constructor(private httpClient: HttpClient) { }

  themHoacSuaForum(forum: Forum){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateForum", forum);
  }

  getDanhSachForum(){
    return this.httpClient.get<any>(this.baseUrl + "GetForum");
  }
  getDanhSachForumComment(forumId: number){
    return this.httpClient.get<any>(this.baseUrl + "GetForumComment?forumId=" + forumId);
  }
  createForumComment(forumComment: ForumComment){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateForumComment", forumComment);
  }
  xoaForum(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteForum?id=" + id);
  }

  getForumById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetForum?Id=" + id);
  }
}
