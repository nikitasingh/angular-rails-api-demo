class AddRatingTable < ActiveRecord::Migration
	def change
	  create_table :ratings do |t|
	    t.integer :score
	    t.integer	:post_id
	    t.timestamps
	  end
	end
end
