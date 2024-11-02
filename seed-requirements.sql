-- Insert requirements
INSERT INTO "Requirement" (id, title, position, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Personal Information', 1, NOW(), NOW()),
  (gen_random_uuid(), 'Medical', 2, NOW(), NOW()),
  (gen_random_uuid(), 'Wakala', 3, NOW(), NOW()),
  (gen_random_uuid(), 'Embassy', 4, NOW(), NOW()),
  (gen_random_uuid(), 'Insurance', 5, NOW(), NOW()),
  (gen_random_uuid(), 'LMIs', 6, NOW(), NOW());
  (gen_random_uuid(), 'Flight', 7, NOW(), NOW());

INSERT INTO "Country" ("id", "name")
VALUES (gen_random_uuid(), 'Saudi Arabia')
-- Get the IDs of the created requirements
DO $$ 
DECLARE
  personal_information_id UUID;
  medical_id UUID;
  wakala_id UUID;
  embassy_id UUID;
  insurance_id UUID;
  lmis_id UUID;
  flight_id UUID;
BEGIN
  SELECT id INTO personal_information_id FROM "Requirement" WHERE title = 'Personal Information';
  SELECT id INTO medical_id FROM "Requirement" WHERE title = 'Medical';
  SELECT id INTO wakala_id FROM "Requirement" WHERE title = 'Wakala';
  SELECT id INTO embassy_id FROM "Requirement" WHERE title = 'Embassy';
  SELECT id INTO insurance_id FROM "Requirement" WHERE title = 'Insurance';
  SELECT id INTO lmis_id FROM "Requirement" WHERE title = 'LMIs';
  SELECT id INTO flight_id FROM "Requirement" WHERE title = 'Flight';


  -- Insert attachments
  INSERT INTO "Attachment" (id, name, type, position, "requirementId", "createdAt", "updatedAt")
  VALUES
    (gen_random_uuid(), 'Phone Number', 'text', 1, personal_information_id, NOW(), NOW()),
    (gen_random_uuid(), 'CV', 'file', 2, personal_information_id, NOW(), NOW()),
    (gen_random_uuid(), 'ID', 'file', 3, personal_information_id, NOW(), NOW()),
    (gen_random_uuid(), 'Passport', 'file', 4, personal_information_id, NOW(), NOW()),
    (gen_random_uuid(), 'From Broker', 'file', 5, personal_information_id, NOW(), NOW()),
    (gen_random_uuid(), 'Payment', 'status', 1, medical_id, NOW(), NOW()),
    (gen_random_uuid(), 'Appointment', 'file', 2, medical_id, NOW(), NOW()),
    (gen_random_uuid(), 'Approval', 'status', 3, medical_id, NOW(), NOW()),
    (gen_random_uuid(), 'Payment', 'status', 1, wakala_id, NOW(), NOW()),
    (gen_random_uuid(), 'Payment', 'status', 1, embassy_id, NOW(), NOW()),
    (gen_random_uuid(), 'Receipt', 'file', 2, embassy_id, NOW(), NOW()),
    (gen_random_uuid(), 'Visa Approval', 'status', 3, embassy_id, NOW(), NOW()),
    (gen_random_uuid(), 'Visa', 'file', 4, embassy_id, NOW(), NOW()),
    (gen_random_uuid(), 'Insurance Payment', 'status', 1, insurance_id, NOW(), NOW()),
    (gen_random_uuid(), 'Insurance Approval', 'status', 2, insurance_id, NOW(), NOW()),
    (gen_random_uuid(), 'Insurance Certificate', 'file', 3, insurance_id, NOW(), NOW()),
    (gen_random_uuid(), 'Has COC?', 'status', 1, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Added to Pulled Labours?', 'status', 2, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Contract Created?', 'status', 3, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Employment Contract', 'file', 4, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Payment', 'status', 5, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Issued?', 'status', 6, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'QR Upload', 'file', 7, lmis_id, NOW(), NOW()),
    (gen_random_uuid(), 'Booking', 'file', 1, flight_id, NOW(), NOW()),
    (gen_random_uuid(), 'Flight Date & Time', 'date', 2, flight_id, NOW(), NOW());
END $$;
