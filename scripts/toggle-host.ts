#!/usr/bin/env node

import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";

/**
 * Toggles a host entry (127.0.0.1 domain) in the `/etc/hosts` file.
 *
 * This script must be run with `sudo` privileges as it modifies a system file.
 *
 * Usage:
 * ```sh
 * sudo ts-node scripts/toggle-host.ts
 * ```
 *
 * The domain is read from the `VITE_APP_HOSTNAME` environment variable.
 * It defaults to "admin.baquex.com" if the environment variable is not set.
 *
 * The script will:
 * - Uncomment the entry if it's commented out.
 * - Comment out the entry if it's active.
 * - Add the entry if it does not exist.
 * - Remove any duplicate lines from the file.
 */
try {
  // Define constants
  const FIXED_IP = "127.0.0.1";
  const DEFAULT_DOMAIN = "admin.baquex.com";
  const HOSTS_FILE_PATH = "/etc/hosts";
  const BACKUP_FILE_PATH = `${HOSTS_FILE_PATH}.bak`;
  const TEMP_FILE_PATH = "/tmp/hosts.tmp";

  const env = loadEnv("development", resolve(import.meta.dirname, ".."));

  let domain = env["VITE_APP_HOSTNAME"] || DEFAULT_DOMAIN;

  // Remove any leading protocol (e.g., http://, https://)
  domain = domain.replace(/^(https?:\/\/)/, "");

  const hostEntry = `${FIXED_IP} ${domain}`;
  const commentedEntry = `# ${hostEntry}`;

  // Read the hosts file content
  const originalContent = await readFile(HOSTS_FILE_PATH, "utf8");
  const lines = originalContent.split("\n");

  let entryExists = false;
  const newContent = lines.map(line => {
    // Check for an exact match of the active entry
    if (line.trim() === hostEntry) {
      entryExists = true;

      console.log(`Entry found. Commenting it out: ${hostEntry}`);

      return commentedEntry;
    }

    // Check for an exact match of the commented entry
    if (line.trim() === commentedEntry) {
      entryExists = true;

      console.log(`Entry found. Uncommenting it: ${hostEntry}`);

      return hostEntry;
    }

    return line;
  });

  // If the entry was not found in either state, add it
  if (!entryExists) {
    console.log(`Entry not found. Adding it: ${hostEntry}`);
    newContent.push(hostEntry);
  }

  // Remove any duplicates from the new content array
  const uniqueLines = Array.from(new Set(newContent));
  const finalContent = uniqueLines.join("\n").replace(/\n+$/, ""); // Ensure no trailing newlines

  // Create a backup of the original file
  await copyFile(HOSTS_FILE_PATH, BACKUP_FILE_PATH);
  console.log(`Backup created at: ${BACKUP_FILE_PATH}`);

  // Write the modified content to a temporary file
  await writeFile(TEMP_FILE_PATH, finalContent, "utf8");

  // Replace the original file with the temporary one
  await copyFile(TEMP_FILE_PATH, HOSTS_FILE_PATH);
  console.log("Successfully updated /etc/hosts file.");
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);

    if (error.message.includes("EACCES")) {
      console.error('Permission denied. Please run the script with "sudo".');
    }
  } else {
    console.error("An unknown error occurred.");
  }

  // Exit with a non-zero code on failure
  process.exit(1);
}
