#!/bin/zsh

source $HOME/.config/colors.sh

# 스크립트 파일이 위치한 디렉토리의 전체 경로 구하기
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"

# TODO 디렉토리명만 추출
# zsh 경로 수정자 설명:
# :h (head) - 경로에서 마지막 구성요소를 제거 (상위 디렉토리로 이동)
# :t (tail) - 경로에서 마지막 구성요소만 추출 (디렉토리명만)
export PROJECT_NAME="${SCRIPT_DIR:t}"

# TODO 어플리케이션 경로설정
export POSTGRES_DATA_PATH="${HOME}/development/podman/${PROJECT_NAME}/postgresql/data"
#export CHATIFY_DATA_PATH="${HOME}/development/podman/${PROJECT_NAME}/chatify/data"
export VALKEY_DATA_PATH="${HOME}/development/podman/${PROJECT_NAME}/valkey/data"

paths=(
  "$POSTGRES_DATA_PATH"
  #"$CHATIFY_DATA_PATH"
  "$VALKEY_DATA_PATH"
)

#
# 템플릿 파일 존재 확인
#
if [ ! -f "$SCRIPT_DIR/secret.template.yaml" ]; then
  echo "${RC_33}Error: Template file secret.template.yaml not found.${CR}"
  exit 1
fi

if [ ! -f "$SCRIPT_DIR/pod.template.yaml" ]; then
  echo "${RC_33}Error: Template file pod.template.yaml not found.${CR}"
  exit 1
fi

#
# secret.yaml 생성
#
envsubst < $SCRIPT_DIR/secret.template.yaml > $SCRIPT_DIR/secret.yaml

#
# pod.yaml 생성
#
envsubst < $SCRIPT_DIR/pod.template.yaml > $SCRIPT_DIR/pod.yaml

#
# 생성된 파일 존재 확인
#
if [ ! -f "$SCRIPT_DIR/secret.yaml" ]; then
  echo "${RC_33}Error: secret.yaml not found.${CR}"
  exit 1
fi

if [ ! -f "$SCRIPT_DIR/pod.yaml" ]; then
  echo "${RC_33}Error: pod.yaml not found.${CR}"
  exit 1
fi

#
# 데이터 디렉토리 생성
#
for path in "${paths[@]}"; do
  if [ ! -d "$path" ]; then
    if ! /bin/mkdir -p "$path"; then
      echo "${RC_33}Error: Failed to create directory $path${CR}"
      exit 1
    fi
    echo "${RC_32}Created directory: $path${CR}"
  fi
done

# # Secret 및 Pod 적용
# podman play kube secret.yaml
# podman pod rm -f vue-starter-pod 2> /dev/null
# podman play kube pod.yaml

# echo "Pod vue-starter-pod started with postgres-data-path=$POSTGRES_DATA_PATH"
