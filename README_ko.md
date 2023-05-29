# CSV, TXT, PDF 파일을 위한 ChatGPT 챗봇 만들기

[English](README.md) | [한국어](README_ko.md)

OpenAI API를 사용하여 PDF, CSV, TET 파일에 대한 ChatGPT 챗봇을 구축할 수 있습니다.

사용되는 기술 스택에는 LangChain, Faiss, Typescript, Openai 및 Next.js가 포함됩니다. LangChain은 확장 가능한 AI/LLM 앱과 챗봇을 쉽게 구축할 수 있는 프레임워크입니다. Faiss는 임베딩과 PDF를 텍스트에 저장하여 나중에 유사한 문서를 검색할 수 있는 벡터 저장소입니다.

[튜토리얼 동영상](https://www.youtube.com/watch?v=ih9PBGVVOO4)

[질문이 있는 경우 디스코드에 참여](https://discord.gg/E4Mc77qwjm)

이 리포지토리와 튜토리얼의 비주얼 가이드는 `visual guide` 폴더에 있습니다.

**오류가 발생하면 이 페이지 아래쪽의 문제 해결 섹션을 참조하세요.**

준비사항: 시스템에 [Node.JS](https://nodejs.org/ko)가 이미 다운로드되어 있고 Node.JS 버전이 18 이상인지 확인하세요.

## 개발

1. 리포지토리를 복제하거나,

```
git clone https://github.com/anpigon/gpt4-pdf-chatbot-langchain-faiss.git
```

2. 또는 ZIP 파일을 다운로드 합니다.

<img src="https://i.imgur.com/rMThF2k.png" width="300"/>


3. 패키지 설치

다음 명령을 실행합니다:

```
npm install
```

설치가 완료되면 이제 `node_modules` 폴더가 표시됩니다.

4. `.env` 파일 설정

- `.env.example`를 `.env`에 복사합니다.
  `.env` 파일은 다음과 같아야 합니다:

```
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=
ANSWER_LANGUAGE=
```

- `OPENAI_API_KEY`: API 키를 [openai](https://platform.openai.com/account/api-keys)에서 발급받고, 이를 .env 파일에 입력합니다.
- `OPENAI_CHAT_MODEL`: `gpt-4` 또는 `gpt-3.5-turbo`를 입력합니다. 
- `ANSWER_LANGUAGE`: ChatGPT가 응답할 언어를 입력합니다. 한국어로 응답을 받고 싶으면 **ko-KR**을 입력합니다.

5. `utils/makechain.ts` 파일에서 자신의 입맛에 맞게 `QA_PROMPT` 프롬프트를 변경할 수 있습니다. 

## PDF, CSV, TXT 파일을 임베딩으로 변환하세요.

**이 리포지토리는 여러 PDF, CSV, TXT 파일들을 로드할 수 있습니다**.

1. `docs` 폴더에 PDF, CSV, TXT 파일 또는 파일이 들어있는 폴더를 추가합니다.

2. `npm run ingest` 명령을 실행하여 문서를 'ingest'하고 문서를 임베드합니다. 오류가 발생하면 아래에서 문제를 해결하세요.

3. `faiss-store` 폴더에 docstore.json 및 faiss.index 파일이 성공적으로 생성되었는지 확인합니다.

4. ***주의***: `npm run ingest` 명령을 실행하면 기존 임베딩이 삭제되고 새로 생성됩니다.

## 앱 실행하기

임베딩과 콘텐츠가 faiss 스토어에 성공적으로 추가되었는지 확인한 후, `npm run dev` 명령을 실행하여 로컬 개발 환경을 시작합니다. 그런 다음, 채팅 인터페이스에 질문을 입력할 수 있습니다.

## 문제 해결

일반적으로 이 리포지토리의 `issues` 및 `discussions` 섹션에서 해결책을 찾아보세요.

**General errors**

- 최신 노드 버전을 실행하고 있는지 확인하세요. `node -v`를 실행하세요.
- 다른 PDF를 시도하거나 먼저 PDF를 텍스트로 변환하세요. PDF가 손상되었거나 스캔되었거나 텍스트로 변환하기 위해 OCR이 필요할 수 있습니다.
- `Console.log` 에서 `env` 변수를 확인하고 해당 변수가 노출되어 있는지 확인하세요.
- 이 리포지토리와 동일한 버전의 LangChain 및 Faiss를 사용하고 있는지 확인하세요.
- 유효한(그리고 작동하는) OpenAI API Key, 환경 및 인덱스 이름이 포함된 `.env` 파일을 생성했는지 확인합니다.
- `modelName` 을 변경하는 경우, 해당 모델의 API에 대한 액세스 권한이 있는지 확인하세요.
- 청구 계정에 충분한 OpenAI 크레딧과 유효한 카드가 있는지 확인하세요.
- 글로벌 환경에 여러 개의 OPENAPI 키가 없는지 확인하세요. 여러 개가 있는 경우 프로젝트의 로컬 `env` 파일을 시스템 `env` 변수로 덮어쓰게 됩니다.
- 여전히 문제가 있는 경우 API 키를 `process.env` 변수에 하드 코딩해 보세요.

##### (추가) faiss에서 libomp 관련 오류가 발생할 경우, 다음과 같은 방법을 시도해 볼 수 있습니다.
"faiss-node"에서 "libomp" 관련 오류를 해결하려면 시스템에 "libomp" 라이브러리를 설치해 볼 수 있습니다. 이 라이브러리는 Faiss에 필요하며 우분투에서 다음 명령을 사용하여 설치할 수 있습니다:

```sh
sudo apt-get install libomp-dev
```

macOS에서는 Homebrew를 사용하여 설치할 수 있습니다:
```sh
brew install libomp
```

윈도우에서는 다음 명령을 사용하여 설치할 수 있습니다:
```sh
conda install libpython m2w64-toolchain -c msys2
conda install faiss-cpu -c pytorch
```

라이브러리를 설치한 후 코드를 다시 실행하여 오류가 지속되는지 확인합니다.


## 크레딧
이 리포지토리의 프론트엔드는 [langchain-chat-nextjs](https://github.com/zahidkhawaja/langchain-chat-nextjs)에서 영감을 얻었습니다.
