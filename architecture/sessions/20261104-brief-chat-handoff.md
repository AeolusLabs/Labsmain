# Brief chat handoff

User asked to finish the interrupted chat repairs. Existing chat implementation and unrelated uncommitted work were retained.

Changed components/brief-assistant.tsx: focus returns after a failed first send as well as after replies; hidden chat cannot take review focus; wrap-up uses the finish flag and sends unsent text without appending instructions that exceed the 1200-character limit. Earlier rollback and final-user-turn fixes were checked.

Verification: architecture/evidence/brief-chat-verification-20261104.md. Production build, typecheck and mock-backed browser flows pass. These checks cover the local interaction fixes, not live provider operation.

Next: verify the deployed environment with its configured Anthropic key and model. No deployment or real enquiry was performed. Local production server started on port 3131 against the pre-existing mock on port 4010 for testing.
