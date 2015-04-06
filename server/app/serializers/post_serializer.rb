class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_score
  has_many :comments
  has_many :tags
  has_many :ratings

  def average_score
  	(object.ratings.map(&:score).sum/object.ratings.count unless object.ratings.blank?) || 0
  end
end
