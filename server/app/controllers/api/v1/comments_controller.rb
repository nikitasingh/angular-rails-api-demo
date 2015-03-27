module Api
	module V1
		class CommentsController < ApplicationController
			def index
				render json: Post.all,root: false
			end

			def create
				# Comment.create(comments_params)
				post = Post.find(comments_params["commentable_id"])
				comment = post.comments.create
				comment.comment = comments_params["comment"]
				comment.save
				render json: Comment.where(commentable_id: comments_params["commentable_id"]), root: false
			end

			def destroy
				comment = Comment.find(params["id"])
				post_id = comment.commentable_id
				comment.delete
				render json: Comment.where(commentable_id: post_id), root: false
			end

			def update
				post = Post.find(params[:id])
				post.update_attributes(posts_params)
			end

			def show
				render json: Post.find(params["id"]),root: false
			end

			def add_comment
				params = posts_params
				post = Post.find(params["id"])
				comment = post.comments.create
				comment.comment = params["comment"]
				binding.pry
				comment.save
				render json: post.comments, each_serializer: CommentSerializer, root: false
			end

			private
      def comments_params
        params.require(:comment).permit(:commentable_id, :comment, :commentable_type)
      end

		end
	end
end
