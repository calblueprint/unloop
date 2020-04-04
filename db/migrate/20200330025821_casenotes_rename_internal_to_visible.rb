class CasenotesRenameInternalToVisible < ActiveRecord::Migration[6.0]
  def change
    rename_column :case_notes, :internal, :visible if column_exists?(:case_notes, :internal) && !column_exists?(:case_notes, :visible)
  end
end
