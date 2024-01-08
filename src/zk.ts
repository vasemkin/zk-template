import * as crypto from "crypto";
import * as snarkjs from "snarkjs";
import { BigNumberish } from "ethers";

//@ts-ignore
import loadWebAssembly from "./Verifier";

export function getVerifierWASM() {
    return loadWebAssembly().buffer;
}

export function convertCallData(calldata: string) {
    const argv = calldata
        .replace(/["[\]\s]/g, "")
        .split(",")
        .map((x) => BigInt(x));

    const a = [argv[0], argv[1]] as [BigNumberish, BigNumberish];

    const b = [
        [argv[2], argv[3]],
        [argv[4], argv[5]],
    ] as [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];

    const c = [argv[6], argv[7]] as [BigNumberish, BigNumberish];

    const input = [argv[8]] as [BigNumberish];

    return { a, b, c, input };
}

export async function getZkProof(a: string, b: string, zkey: string) {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        {
            a,
            b,
        },
        getVerifierWASM(),
        zkey
    );

    const cd = convertCallData(
        await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    );

    return {
        target_num: publicSignals[0],
        proof_a: cd.a,
        proof_b: cd.b,
        proof_c: cd.c,
    };
}
