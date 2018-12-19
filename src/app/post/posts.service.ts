import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/Operators";
import { Router } from "@angular/router";
import { stringify } from "@angular/core/src/util";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ post: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string, posts: any, maxPosts: number }>("http://localhost:3000/api/posts" + queryParams)
      .pipe(
        map(postData => {
          return { post: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }), maxPosts: postData.maxPosts
        };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.post;
        this.postsUpdated.next({post: [...this.posts], postCount: transformedPostData.maxPosts});
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string
    }>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    console.log("update post service !");
    let postData: Post | FormData;
    if (typeof (image) === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }

    this.http
      .put<{ message: string; imagePath: string }>(
        "http://localhost:3000/api/posts/" + id,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId);
  }
}
