# Hi, welcome to BRG codebase

Prerequsites - 

## create a .env file inside backend/ and add the following info
# Define the base path for external storage
EXTERNAL_STORAGE_BASE_PATH=path\to\your\external_storage

# Define specific directories within the external storage
UPLOADS_DIR=uploads
OUTPUTS_DIR=outputs
BRAIN_ROTTING_VIDEOS_DIR=brainRottingVideos
BRAIN_ROTTING_AUDIOS_DIR=brainRottingAudios

## Create the following directories inside backend
captions/

## Install whisper, this takes care of the caption generator
(Ensure admin privileges when installing to avoid permission issues)
pip install -U openai-whisper
