const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const requirements = await database.requirement.createMany({
      data: [
        { title: "Personal Information", position: 1 },
        { title: "Medical", position: 2 },
        { title: "Embassy", position: 3 },
        { title: "Insurance", position: 4 },
        { title: "Flight", position: 5 }
      ]
    });

    const createdRequirements = await database.requirement.findMany();

    const requirementMap = createdRequirements.reduce((map: any, req: any) => {
      map[req.title] = req.id;
      return map;
    }, {});

    const attachmentsData = [
      { name: "Phone Number", type: 'text', position: 1, requirementId: requirementMap["Personal Information"] },
      { name: "CV", type: 'file', position: 2, requirementId: requirementMap["Personal Information"] },
      { name: "ID", type: 'file', position: 3, requirementId: requirementMap["Personal Information"] },
      { name: "Passport", type: 'file', position: 4, requirementId: requirementMap["Personal Information"] },
      { name: "Payment", type: 'status', position: 1, requirementId: requirementMap["Medical"] },
      { name: "Appointment", type: 'file', position: 2, requirementId: requirementMap["Medical"] },
      { name: "Approval", type: 'status', position: 3, requirementId: requirementMap["Medical"] },
      { name: "Payment", type: 'status', position: 1, requirementId: requirementMap["Embassy"] },
      { name: "Receipt", type: 'file', position: 2, requirementId: requirementMap["Embassy"] },
      { name: "Visa Approval", type: 'status', position: 3, requirementId: requirementMap["Embassy"] },
      { name: "Visa", type: 'file', position: 4, requirementId: requirementMap["Embassy"] },
      { name: "Insurance Payment", type: 'status', position: 1, requirementId: requirementMap["Insurance"] },
      { name: "Insurance Approval", type: 'status', position: 2, requirementId: requirementMap["Insurance"] },
      { name: "Insurance Certificate", type: 'file', position: 3, requirementId: requirementMap["Insurance"] },
      { name: "Booking", type: 'file', position: 1, requirementId: requirementMap["Flight"] },
      { name: "Flight Date & Time", type: 'text', position: 2, requirementId: requirementMap["Flight"] }
    ];

    const attachments = await database.attachment.createMany({
      data: attachmentsData
    });

    console.log("SEED_WORKED_PERFECTLY: ", attachments);
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main