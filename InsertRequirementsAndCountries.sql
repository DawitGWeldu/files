-- Insert requirements
INSERT INTO `Requirement` (id, title, position, `createdAt`, `updatedAt`)
VALUES
  (UUID(), 'Personal Information', 1, NOW(), NOW()),
  (UUID(), 'Fingerprint', 2, NOW(), NOW()),
  (UUID(), 'Medical', 3, NOW(), NOW()),
  (UUID(), 'Wakala', 4, NOW(), NOW()),
  (UUID(), 'Embassy', 5, NOW(), NOW()),
  (UUID(), 'Insurance', 6, NOW(), NOW()),
  (UUID(), 'LMIs', 7, NOW(), NOW()),
  (UUID(), 'Flight', 8, NOW(), NOW());

-- Insert countries
INSERT INTO `Country` (id, name)
VALUES 
  (UUID(), 'Saudi Arabia'),
  (UUID(), 'Qatar'),
  (UUID(), 'Jordan'),
  (UUID(), 'Kuwait'),
  (UUID(), 'United Arab Emirates'),
  (UUID(), 'Lebanon');
