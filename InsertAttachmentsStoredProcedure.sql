BEGIN
  DECLARE personal_information_id CHAR(36);
  DECLARE fingerprint_id CHAR(36);
  DECLARE medical_id CHAR(36);
  DECLARE wakala_id CHAR(36);
  DECLARE embassy_id CHAR(36);
  DECLARE insurance_id CHAR(36);
  DECLARE lmis_id CHAR(36);
  DECLARE flight_id CHAR(36);

  -- Retrieve IDs
  SELECT id INTO personal_information_id FROM `Requirement` WHERE title = 'Personal Information';
  SELECT id INTO fingerprint_id FROM `Requirement` WHERE title = 'Fingerprint';
  SELECT id INTO medical_id FROM `Requirement` WHERE title = 'Medical';
  SELECT id INTO wakala_id FROM `Requirement` WHERE title = 'Wakala';
  SELECT id INTO embassy_id FROM `Requirement` WHERE title = 'Embassy';
  SELECT id INTO insurance_id FROM `Requirement` WHERE title = 'Insurance';
  SELECT id INTO lmis_id FROM `Requirement` WHERE title = 'LMIs';
  SELECT id INTO flight_id FROM `Requirement` WHERE title = 'Flight';

  -- Insert attachments
  INSERT INTO `Attachment` (id, name, type, position, `requirementId`, `createdAt`, `updatedAt`)
  VALUES
    (UUID(), 'Phone Number', 'text', 1, personal_information_id, NOW(), NOW()),
    (UUID(), 'CV', 'file', 2, personal_information_id, NOW(), NOW()),
    (UUID(), 'ID', 'file', 3, personal_information_id, NOW(), NOW()),
    (UUID(), 'Passport', 'file', 4, personal_information_id, NOW(), NOW()),
    (UUID(), 'Photo', 'file', 5, personal_information_id, NOW(), NOW()),
    (UUID(), 'Employment Contract', 'file', 6, personal_information_id, NOW(), NOW()),
    (UUID(), 'Phone Number', 'text', 1, fingerprint_id, NOW(), NOW()),
    (UUID(), 'Password', 'text', 2, fingerprint_id, NOW(), NOW()),
    (UUID(), 'Temporary ID', 'text', 3, fingerprint_id, NOW(), NOW()),
    (UUID(), 'Fingerprint Taken', 'status', 4, fingerprint_id, NOW(), NOW()),
    (UUID(), 'Labour ID', 'text', 5, fingerprint_id, NOW(), NOW()),
    (UUID(), 'Appointment Slip', 'file', 2, medical_id, NOW(), NOW()),
    (UUID(), 'Approval', 'status', 3, medical_id, NOW(), NOW()),
    (UUID(), 'Payment', 'status', 1, wakala_id, NOW(), NOW()),
    (UUID(), 'Payment', 'status', 1, embassy_id, NOW(), NOW()),
    (UUID(), 'Receipt', 'file', 2, embassy_id, NOW(), NOW()), 
    (UUID(), 'Eazy Enjaz Paper', 'file', 3, embassy_id, NOW(), NOW()),
    (UUID(), 'List to Embassy', 'file', 4, embassy_id, NOW(), NOW())
    (UUID(), 'Visa Approval', 'status', 5, embassy_id, NOW(), NOW()),
    (UUID(), 'Visa', 'file', 4, embassy_id, NOW(), NOW()),
    (UUID(), 'Insurance Payment', 'status', 1, insurance_id, NOW(), NOW()),
    (UUID(), 'Insurance Form Submitted', 'status', 2, insurance_id, NOW(), NOW()),
    (UUID(), 'Insurance Certificate', 'file', 3, insurance_id, NOW(), NOW()),
    (UUID(), 'Has COC?', 'status', 1, lmis_id, NOW(), NOW()),
    (UUID(), 'Added to Pulled Labours?', 'status', 2, lmis_id, NOW(), NOW()),
    (UUID(), 'Contract Created?', 'status', 3, lmis_id, NOW(), NOW()),
    (UUID(), 'Emergency Contact ID', 'file', 4, lmis_id, NOW(), NOW()),
    (UUID(), 'Payment Code', 'text', 5, lmis_id, NOW(), NOW()),
    (UUID(), 'Payment', 'status', 6, lmis_id, NOW(), NOW()),
    (UUID(), 'Issued?', 'status', 7, lmis_id, NOW(), NOW()),
    (UUID(), 'QR Upload', 'file', 8, lmis_id, NOW(), NOW()),
    (UUID(), 'Booking', 'file', 1, flight_id, NOW(), NOW()),
    (UUID(), 'Flight Date & Time', 'date', 2, flight_id, NOW(), NOW());
END