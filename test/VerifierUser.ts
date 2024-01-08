import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getZkProof } from "../src/zk";

describe("Verifier User", function () {
    async function deployVerifierUser() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const Verifier = await ethers.getContractFactory("Groth16Verifier");
        const verifier = await Verifier.deploy();
        await verifier.waitForDeployment();

        const VerifierUser = await ethers.getContractFactory("VerifierUser");
        const verifierUser = await VerifierUser.deploy(
            await verifier.getAddress()
        );
        await verifierUser.waitForDeployment();

        return { verifier, verifierUser, owner, otherAccount };
    }

    describe("ZK Groth16 Verifier User", function () {
        it("Works with inputs: 10, 3", async function () {
            const { verifierUser } = await loadFixture(deployVerifierUser);

            const proof1 = await getZkProof("10", "3", "build/Verifier.zkey");

            expect(proof1.target_num).to.eq(10n * 3n);

            expect(
                await verifierUser.verify(
                    30n,
                    proof1.proof_a,
                    proof1.proof_b,
                    proof1.proof_c
                )
            ).not.to.be.reverted;

            await expect(
                verifierUser.verify(
                    31n,
                    proof1.proof_a,
                    proof1.proof_b,
                    proof1.proof_c
                )
            ).to.be.reverted;
        });

        it("Works with inputs: 115, 2", async function () {
            const { verifierUser } = await loadFixture(deployVerifierUser);

            const proof1 = await getZkProof("115", "2", "build/Verifier.zkey");

            expect(proof1.target_num).to.eq(115n * 2n);

            expect(
                await verifierUser.verify(
                    230n,
                    proof1.proof_a,
                    proof1.proof_b,
                    proof1.proof_c
                )
            ).not.to.be.reverted;

            await expect(
                verifierUser.verify(
                    301n,
                    proof1.proof_a,
                    proof1.proof_b,
                    proof1.proof_c
                )
            ).to.be.reverted;
        });
    });
});
