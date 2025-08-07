import { sutHelper } from './environment/sut';

/**
 * Adds a current time stamp to all log outputs for proper referencing
 */
function globalSetup() {
  const date = new Date();
  const timeStamp = `${date.toDateString().toUpperCase()} ${date.toTimeString()}`;
  console.log(`[${sutHelper.env()} : ${timeStamp}]`);
  console.log(process.env.ENVIRONMENT, process.env.LANGUAGE);
}

export default globalSetup;
