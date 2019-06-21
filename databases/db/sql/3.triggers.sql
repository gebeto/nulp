CREATE OR REPLACE FUNCTION log_role_update_action()
    RETURNS trigger LANGUAGE 'plpgsql' COST 100 VOLATILE NOT LEAKPROOF 
AS $BODY$
BEGIN
	INSERT INTO "logs" (message) VALUES
		(CONCAT('Змінено назву ролі "', OLD.name, '" на "', NEW.name, '"'))
	;
	RETURN NEW;
END
$BODY$;

CREATE TRIGGER log_role_update
	AFTER UPDATE ON "role" FOR EACH ROW
	EXECUTE PROCEDURE log_role_update_action();

