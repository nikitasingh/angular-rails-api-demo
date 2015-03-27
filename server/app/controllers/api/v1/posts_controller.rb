module Api
	module V1
		class PostsController < ApplicationController
			def index
				render json: Post.all,root: false
			end

			def create
				Post.create(posts_params)
				render json: Post.all
			end

			def destroy
				post = Post.find(params["id"])
				post.delete
				render json: Post.all
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
				comment.save
				render json: post.comments, each_serializer: CommentSerializer, root: false
			end

			private
      def posts_params
        params.require(:posts).permit(:title,:id,:description,:comment)
      end

		end
	end
end
