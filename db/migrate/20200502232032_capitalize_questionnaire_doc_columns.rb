class CapitalizeQuestionnaireDocColumns < ActiveRecord::Migration[6.0]
  def change
    rename_column :personal_questionnaires, :doc_status, :DOC_status if column_exists?(:personal_questionnaires, :doc_status) && !column_exists?(:personal_questionnaires, :DOC_status)
    rename_column :personal_questionnaires, :doc_regulations, :DOC_regulations if column_exists?(:personal_questionnaires, :doc_regulations) && !column_exists?(:personal_questionnaires, :DOC_regulations)
  end
end
