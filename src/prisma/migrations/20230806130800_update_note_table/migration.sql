BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Note] ADD [archived] BIT NOT NULL CONSTRAINT [Note_archived_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
