import { AppInstallationRepository } from "./app-installation.repository";
import { SessionRepository } from "./session.repository";

class DatabaseService {
  sessions = new SessionRepository();
  appInstallations = new AppInstallationRepository();
}
export const dbService = new DatabaseService();
