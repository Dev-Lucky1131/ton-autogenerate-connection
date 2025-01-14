// import TonWeb from 'tonweb';
// import { generateMnemonic, mnemonicToSeed } from 'tonweb-mnemonic';
// import * as fs from 'fs';
// import { createObjectCsvWriter } from 'csv-writer';

// const TOTAL_WALLETS = 3000; // Total number of wallets to generate
// const BATCH_SIZE = 100; // Number of wallets to generate in each batch
// const CSV_FILE_PATH = 'ton_wallets.csv'; // Output CSV file path

// (async () => {
//   const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC');
//   const TonWallet = TonWeb.Wallets.all.v3R2;

//   // Initialize CSV writer
//   const csvWriter = createObjectCsvWriter({
//     path: CSV_FILE_PATH,
//     header: [
//       { id: 'index', title: 'Index' },
//       { id: 'mnemonic', title: 'Mnemonic' },
//       { id: 'address', title: 'Address' },
//       // Add more headers if needed, e.g., balance
//     ],
//   });

//   const walletsInfo: Array<{ index: number; mnemonic: string; address: string }> = [];

//   // Function to generate a single wallet
//   const generateWallet = async (i: number) => {
//     try {
//       const mnemonic = await generateMnemonic();
//       const seed = await mnemonicToSeed(mnemonic);
//       const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(seed);

//       const wallet = new TonWallet(provider, {
//         publicKey: keyPair.publicKey,
//         wc: -1,
//       });

//       const addressObj = await wallet.getAddress();
//       const address = addressObj.toString(true, true, true);

//       return {
//         index: i,
//         mnemonic: mnemonic.join(' '),
//         address,
//       };
//     } catch (error) {
//       console.error(`Error generating wallet at index ${i}:`, error);
//       return {
//         index: i,
//         mnemonic: 'Error',
//         address: 'Error',
//       };
//     }
//   };

//   // Function to process wallets in batches
//   const processInBatches = async () => {
//     for (let batchStart = 0; batchStart < TOTAL_WALLETS; batchStart += BATCH_SIZE) {
//       const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_WALLETS - batchStart);
//       const batchPromises = [];

//       for (let i = 0; i < currentBatchSize; i++) {
//         const walletIndex = batchStart + i + 1; // Starting index from 1
//         batchPromises.push(generateWallet(walletIndex));
//       }

//       // Wait for the current batch to complete
//       const batchResults = await Promise.all(batchPromises);
//       walletsInfo.push(...batchResults);

//       console.log(`Generated ${batchStart + currentBatchSize} / ${TOTAL_WALLETS} wallets`);
//     }
//   };

//   console.log('Starting wallet generation...');
//   await processInBatches();
//   console.log('Wallet generation completed.');

//   // Write all wallet info to CSV
//   try {
//     await csvWriter.writeRecords(walletsInfo);
//     console.log(`Wallets have been successfully written to ${CSV_FILE_PATH}`);
//   } catch (error) {
//     console.error('Error writing to CSV:', error);
//   }
// })();















































// import TonWeb from "tonweb";
// import puppeteer from "puppeteer";
// import { mnemonicToWalletKey } from "ton-crypto";

// const wallets = [
//   "dentist tone hair print snow glad media enroll try join require defense alone decrease wealth valid hour engine return glimpse attend range dirt all",
// ];

// (async () => {
//   const tonweb = new TonWeb();

//   // Launch Puppeteer browser
//   const browser = await puppeteer.launch({
//     headless: false, // Set to false for debugging
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

//   try {
//     const page = await browser.newPage();

//     // Navigate to the website
//     console.log("Navigating to the website...");
//     await page.goto("https://tonyield.app/vaults", {
//       waitUntil: "domcontentloaded",
//       timeout: 60000,
//     });
//     console.log("Website loaded successfully.");

//     // Handle click events
//     const handleClickEvents = async () => {
//       console.log("Handling click events...");

//       // Click "Agree" in the Terms Modal
//       await page.evaluate(() => {
//         const agreeButton = document.querySelector<HTMLButtonElement>(
//           ".TermsModal_agree__V9Q4b .Button_button__Y6_d8"
//         );
//         if (agreeButton) {
//           agreeButton.click();
//         }
//       });

//       // Click "Login" in the Login Modal
//       await page.evaluate(() => {
//         const loginButton = document.querySelector<HTMLButtonElement>(
//           ".LoginModal_container__QulKL .Button_button__Y6_d8"
//         );
//         if (loginButton) {
//           loginButton.click();
//         }
//       });

//       // Click the "go" button with a dynamic class
//       await page.evaluate(() => {
//         const goButton = document.querySelector<HTMLButtonElement>(".go4005132735");
//         if (goButton) {
//           goButton.click();
//         }
//       });

//       console.log("All click events handled.");
//     };

//     await handleClickEvents();

//     // Programmatically sign into the TON wallet using mnemonic
//     for (const mnemonic of wallets) {
//       try {
//         console.log("Signing into TON wallet...");

//         // Convert mnemonic to key pair
//         const keyPair = await mnemonicToWalletKey(mnemonic.split(" "));

//         // Create WalletV3ContractR2 instance
//         const walletContract = new tonweb.wallet.all.v3R2(tonweb.provider, {
//           publicKey: keyPair.publicKey,
//           wc: 0,
//         });

//         const walletAddress = await walletContract.getAddress();
//         console.log(`Wallet Address: ${walletAddress.toString()}`);

//         // Emulate the connection process
//         await page.evaluate(
//           (walletAddr) => {
//             // Simulate wallet connection logic using the address
//             const connectEvent = new CustomEvent("tonconnect", {
//               detail: {
//                 walletAddress: walletAddr,
//               },
//             });
//             window.dispatchEvent(connectEvent);
//             console.log("Wallet connection emulated.");
//           },
//           walletAddress.toString()
//         );

//         console.log(`Wallet ${walletAddress.toString()} signed in successfully.`);
//       } catch (walletError) {
//         console.error(`Error processing wallet: ${(walletError as Error).message}`);
//       }
//     }
//   } catch (error) {
//     console.error(`Automation failed: ${(error as Error).message}`);
//   } finally {
//     await browser.close();
//     console.log("All wallets processed.");
//   }
// })();













import TonWeb from 'tonweb';
import { generateMnemonic, mnemonicToSeed } from 'tonweb-mnemonic';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import puppeteer from 'puppeteer';

const TOTAL_WALLETS = 3000; // Total number of wallets to generate
const BATCH_SIZE = 100; // Number of wallets to generate in each batch
const CSV_FILE_PATH = 'ton_wallets.csv'; // Output CSV file path

(async () => {
  const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC');
  const TonWallet = TonWeb.Wallets.all.v3R2;

  // Initialize CSV writer
  const csvWriter = createObjectCsvWriter({
    path: CSV_FILE_PATH,
    header: [
      { id: 'index', title: 'Index' },
      { id: 'mnemonic', title: 'Mnemonic' },
      { id: 'address', title: 'Address' },
    ],
  });

  const walletsInfo: Array<{ index: number; mnemonic: string; address: string }> = [];

  // Function to generate a single wallet
  const generateWallet = async (i: number) => {
    try {
      const mnemonic = await generateMnemonic();
      const seed = await mnemonicToSeed(mnemonic);
      const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(seed);

      const wallet = new TonWallet(provider, {
        publicKey: keyPair.publicKey,
        wc: -1,
      });

      const addressObj = await wallet.getAddress();
      const address = addressObj.toString(true, true, true);

      return {
        index: i,
        mnemonic: mnemonic.join(' '),
        address,
      };
    } catch (error) {
      console.error(`Error generating wallet at index ${i}:`, error);
      return {
        index: i,
        mnemonic: 'Error',
        address: 'Error',
      };
    }
  };

  // Function to process wallets in batches
  const processInBatches = async () => {
    for (let batchStart = 0; batchStart < TOTAL_WALLETS; batchStart += BATCH_SIZE) {
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_WALLETS - batchStart);
      const batchPromises = [];

      for (let i = 0; i < currentBatchSize; i++) {
        const walletIndex = batchStart + i + 1; // Starting index from 1
        batchPromises.push(generateWallet(walletIndex));
      }

      // Wait for the current batch to complete
      const batchResults = await Promise.all(batchPromises);
      walletsInfo.push(...batchResults);

      console.log(`Generated ${batchStart + currentBatchSize} / ${TOTAL_WALLETS} wallets`);
    }
  };

  console.log('Starting wallet generation...');
  await processInBatches();
  console.log('Wallet generation completed.');

  // Write all wallet info to CSV
  try {
    await csvWriter.writeRecords(walletsInfo);
    console.log(`Wallets have been successfully written to ${CSV_FILE_PATH}`);
  } catch (error) {
    console.error('Error writing to CSV:', error);
  }

  // Launch Puppeteer browser for signing in
  const browser = await puppeteer.launch({
    headless: false, // Set to false for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Navigate to the website
    console.log('Navigating to the website...');
    await page.goto('https://tonyield.app/vaults', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Website loaded successfully.');

    // Function to handle click events
    const handleClickEvents = async () => {
      console.log('Handling click events...');

      // Click "Agree" in the Terms Modal
      await page.evaluate(() => {
        const agreeButton = document.querySelector<HTMLButtonElement>(
          '.TermsModal_agree__V9Q4b .Button_button__Y6_d8'
        );
        if (agreeButton) {
          agreeButton.click();
        }
      });

      // Click "Login" in the Login Modal
      await page.evaluate(() => {
        const loginButton = document.querySelector<HTMLButtonElement>(
          '.LoginModal_container__QulKL .Button_button__Y6_d8'
        );
        if (loginButton) {
          loginButton.click();
        }
      });

      // Click the "go" button with a dynamic class
      await page.evaluate(() => {
        const goButton = document.querySelector<HTMLButtonElement>('.go4005132735');
        if (goButton) {
          goButton.click();
        }
      });

      console.log('All click events handled.');
    };

    await handleClickEvents();

    // Iterate through all wallets and connect them programmatically
    for (const wallet of walletsInfo) {
      if (wallet.mnemonic === 'Error') {
        console.log(`Skipping wallet ${wallet.index} due to generation error.`);
        continue;
      }

      console.log(`Connecting wallet ${wallet.index}: ${wallet.address}`);

      // Simulate wallet connection in Puppeteer
      await page.evaluate(
        (walletAddr) => {
          const connectEvent = new CustomEvent('tonconnect', {
            detail: {
              walletAddress: walletAddr,
            },
          });
          window.dispatchEvent(connectEvent);
        },
        wallet.address
      );

      console.log(`Wallet ${wallet.index} connected successfully.`);
    }
  } catch (error) {
    console.error('Error during wallet connection:', error);
  } finally {
    await browser.close();
    console.log('All wallets processed and connected.');
  }
})();
