import * as admin from "firebase-admin";

// Initialize admin if not already initialized
if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: "demo-experimental" });
}

const db = admin.firestore();

export async function setupTestData() {
  const bundlesCollection = db.collection("bundles");

  // Add missing bundle specs
  const missingBundles = [
    {
      id: "query-with-a-collection-and-multiple-where-conditions",
      data: {
        queries: {
          example: {
            collection: "documents",
            conditions: [
              { where: ["example", "==", "document"] },
              { where: ["name", "==", "document1"] },
            ],
          },
        },
      },
    },
    {
      id: "with-server-cache",
      data: {
        serverCache: 300,
      },
    },
    {
      id: "with-file-cache",
      data: {
        fileCache: true,
        docs: [],
        queries: {},
      },
    },
  ];

  const promises = missingBundles.map((bundle) =>
    bundlesCollection.doc(bundle.id).set(bundle.data, { merge: true }),
  );

  await Promise.all(promises);
}
