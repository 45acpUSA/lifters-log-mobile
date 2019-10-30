class OlympicLift < ApplicationRecord
  belongs_to :user

  validates :clean_and_jerk, :snatch, :clean, :power_clean, :jerk, :power_jerk, :power_snatch, numericality: true

end
