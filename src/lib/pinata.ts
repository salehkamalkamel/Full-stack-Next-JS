// src/lib/pinata.ts
import PinataClient, { PinataPinOptions, PinataPinResponse } from "@pinata/sdk";
import { Readable } from "stream";
import { Buffer } from "buffer"; // Ensure Buffer is explicitly imported if needed in some environments

// --- Get Environment Variables ---
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_API_SECRET;
const pinataGatewayUrl =
  process.env.PINATA_GATEWAY_URL || "https://gateway.pinata.cloud"; // Provide a default public gateway

// --- Environment Variable Check ---
if (!pinataApiKey || !pinataSecretApiKey) {
  console.error(
    "Pinata API Key or Secret Key is not defined in environment variables."
  );
  // Throwing an error here might be too disruptive during build/startup in some cases.
  // Consider logging the error and allowing functions to fail gracefully,
  // or implement a more sophisticated configuration check.
  // For now, we'll let the functions fail if keys are missing.
}

// --- Initialize Pinata Client ---
// Only initialize if keys are present to avoid errors during import if keys are missing
let pinata: PinataClient | null = null;
if (pinataApiKey && pinataSecretApiKey) {
  pinata = new PinataClient(pinataApiKey, pinataSecretApiKey);
} else {
  console.warn("Pinata client not initialized due to missing API keys.");
}

/**
 * Uploads a file buffer to Pinata IPFS.
 * @param file - The File object to upload.
 * @returns A promise that resolves with the Pinata API response.
 * @throws If Pinata client is not initialized or upload fails.
 */
export async function uploadToPinata(file: File): Promise<PinataPinResponse> {
  if (!pinata) {
    throw new Error("Pinata client is not initialized. Check API keys.");
  }

  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid file provided for upload.");
  }

  console.log(
    `Attempting to upload file: ${file.name} (Size: ${file.size} bytes)`
  );

  try {
    // Convert File to Readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const options: PinataPinOptions = {
      pinataMetadata: {
        name: file.name, // Use original file name, sanitized if necessary
        // keyvalues: { /* Add custom key-values if needed */ }
      },
      pinataOptions: {
        // cidVersion: 1 // Optionally specify CID version
      },
    };

    // Pin the file stream
    const result = await pinata.pinFileToIPFS(stream, options);
    console.log(`Pinata upload successful for ${file.name}:`, result);
    return result;
  } catch (error) {
    console.error(`Error uploading file "${file.name}" to Pinata:`, error);
    // Provide a more specific error message
    if (error instanceof Error) {
      throw new Error(
        `Pinata upload failed for ${file.name}: ${error.message}`
      );
    } else {
      throw new Error(
        `An unknown error occurred during Pinata upload for ${file.name}.`
      );
    }
  }
}

export async function deletePinataFile(ipfsHash: string): Promise<void> {
  if (!pinata) {
    throw new Error("Pinata client is not initialized. Check API keys.");
  }

  if (!ipfsHash) {
    throw new Error("Invalid IPFS hash provided for deletion.");
  }

  try {
    console.log(`Attempting to delete file with IPFS hash: ${ipfsHash}`);
    await pinata.unpin(ipfsHash);
    console.log(`Successfully deleted file with IPFS hash: ${ipfsHash}`);
  } catch (error) {
    console.error(
      `Error deleting file with IPFS hash "${ipfsHash}" from Pinata:`,
      error
    );
    throw new Error(
      `Pinata deletion failed for IPFS hash ${ipfsHash}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Constructs a public gateway URL for a given Pinata response.
 * @param response - The response object from a successful Pinata pin operation.
 * @returns The full public URL to access the pinned content via a gateway.
 */
export function getImageUrlFromPinataResponse(
  response: PinataPinResponse
): string {
  if (!response || !response.IpfsHash) {
    console.error(
      "Invalid Pinata response provided to getImageUrlFromPinataResponse"
    );
    return ""; // Return empty string or throw error based on desired handling
  }
  // Ensure gateway URL doesn't end with a slash
  const cleanGateway = pinataGatewayUrl.endsWith("/")
    ? pinataGatewayUrl.slice(0, -1)
    : pinataGatewayUrl;

  // Ensure CID (IpfsHash) doesn't start with a slash
  const cleanIpfsHash = response.IpfsHash.startsWith("/")
    ? response.IpfsHash.slice(1)
    : response.IpfsHash;

  return `${cleanGateway}/ipfs/${cleanIpfsHash}`;
}
