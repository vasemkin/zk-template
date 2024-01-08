// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external pure returns (bool r);
}

contract VerifierUser {
    address internal _verifier;

    constructor(address verifier) {
        _verifier = verifier;
    }

    function verify(
        uint256 _target_num,
        uint[2] memory _proof_a,
        uint[2][2] memory _proof_b,
        uint[2] memory _proof_c)
    public view {
        require(
            IVerifier(_verifier).verifyProof(
                _proof_a,
                _proof_b,
                _proof_c,
                [_target_num]
            ),
            "Invalid proof"
        );
    }
}
