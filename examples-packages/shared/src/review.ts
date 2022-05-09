
   
// Have to retype the Prisma generated DB types since you cant separate them from the Node.js-only
// Prisma client. A flaw in their implementation IMO.
export enum ReviewStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}