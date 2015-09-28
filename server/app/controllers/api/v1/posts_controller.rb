module Api
  module V1
    class PostsController < ApplicationController
      def index
	render json: Post.all,root: false
      end

      def create
	Post.create(create_posts_params)
	render json: Post.all
      end

      def destroy
	post = Post.find(params["id"])
	post.delete
	render json: Post.all
      end

      def update
	post = Post.find(posts_params[:id])
	post.title = posts_params[:title]
	post.description = posts_params[:description]
	post.tag_list.add(posts_params[:tag_list]) unless posts_params[:tag_list].nil?
	post.tag_list.remove(posts_params[:tag_list].nil? ? post.tag_list : (post.tag_list-posts_params[:tag_list]))
	post.save
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

      def get_tag_list
	render json: Tag.where("name like ?","#{params[:term]}%").map(&:name), root: false
      end

      def add_rating
	params = posts_params
	post = Post.find(params["id"])
	rating = post.ratings.create
	rating.score = params["average_score"]
	rating.save
	average_score = (post.ratings.map(&:score).sum/post.ratings.count)
	render json: {average_score: average_score}, root: false
      end

      private
      def posts_params
        params.require(:posts).permit(:average_score,:title,:id,:description,:comment,:tag,:tag_list, :tag_list => [])
      end

      def create_posts_params
        params.require(:posts).permit(:title,:id,:description,:comment,:tag,:tag_list, :tag_list => [])
      end
    end
  end
 end
