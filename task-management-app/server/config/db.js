const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("Missing MongoDB URI. Set MONGODB_URI (or MONGO_URI) in .env");
        }

        // Some networks block/refuse SRV lookups on default DNS servers.
        if (mongoUri.startsWith("mongodb+srv://")) {
            const dnsServers = process.env.DNS_SERVERS
                ? process.env.DNS_SERVERS.split(",").map((server) => server.trim()).filter(Boolean)
                : ["8.8.8.8", "1.1.1.1"];
            dns.setServers(dnsServers);
        }

        await mongoose.connect(mongoUri);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;