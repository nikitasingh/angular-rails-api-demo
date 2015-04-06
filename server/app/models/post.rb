class Post < ActiveRecord::Base
	acts_as_commentable
	acts_as_taggable_on :tags
	has_many :ratings
end
