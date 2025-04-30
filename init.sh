#!/bin/zsh

source $HOME/.config/colors.sh

# 스크립트 파일이 위치한 디렉토리의 전체 경로 구하기
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"

# 디렉토리명만 추출
export PROJECT_NAME="${SCRIPT_DIR:t}"

export POSTGRES_DATA_PATH="${HOME}/development/podman/${PROJECT_NAME}/postgresql/data"
export VALKEY_DATA_PATH="${HOME}/development/podman/${PROJECT_NAME}/valkey/data"

SECRET_FILE="$SCRIPT_DIR/secret.yaml"

#
# secret.yaml 생성
#
envsubst < $SCRIPT_DIR/secret.template.yaml > $SCRIPT_DIR/secret.yaml

#
# pod.yaml 생성
#
envsubst < $SCRIPT_DIR/pod.template.yaml > $SCRIPT_DIR/pod.yaml

#
# Secret 파일 확인
#
if [ ! -f "$SECRET_FILE" ]; then
  echo "${RC_33}Error: Secret file $SECRET_FILE not found.${CR}"
  exit 1
fi

#
# 데이터 디렉토리 생성
#
mkdir -p "$POSTGRES_DATA_PATH"
mkdir -p "$VALKEY_DATA_PATH"

# # Secret 및 Pod 적용
# podman play kube secret.yaml
# podman pod rm -f vue-starter-pod 2> /dev/null
# podman play kube pod.yaml

# echo "Pod vue-starter-pod started with postgres-data-path=$POSTGRES_DATA_PATH"
