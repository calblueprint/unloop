class PaperworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :agree, :staff, :participant

  def staff
    {
      staff_id: self.object.staff.id
    }
  end
end
