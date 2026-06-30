# Workspace Rules & Future Builds

## July Build: South African Local Transcription Model (POPA Aigency)
- **Objective**: Build a local, 100% private voice-to-text model optimized for South African languages and slang (code-switching between English, Zulu, Xhosa, Sotho, Afrikaans, etc.).
- **Timeline**: July, to be tackled agentically after completing the current FOLA & LoveBetter work.
- **Approach**:
  - Phase 1: Local LLM post-processing correction layer (using Ollama Llama-3).
  - Phase 2: Whisper/NeMo model fine-tuning using Apple MLX on local Apple Silicon.
  - Phase 3: Custom vocabulary injection for local names, slang (*lekker*, *eish*, *Mzansi*), and cultural context.
