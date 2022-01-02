# Fork한 Repository 동기화하기

1. remote repository 확인

```bash
$ git remote -v
origin  https://lab.ssafy.com/fallingstars2749/cs-study.git (fetch)
origin  https://lab.ssafy.com/fallingstars2749/cs-study.git (push)
```

2. 원본 repository를 `upstream`이라는 이름의 remote repository로 추가

```bash
$ git remote add upstream https://lab.ssafy.com/self-study/cs-study.git
```

3. remote repository에 잘 추가되었는지 확인하기

```bash
$ git remote -v
origin  https://lab.ssafy.com/fallingstars2749/cs-study.git (fetch)
origin  https://lab.ssafy.com/fallingstars2749/cs-study.git (push)
upstream        https://lab.ssafy.com/self-study/cs-study.git (fetch)
upstream        https://lab.ssafy.com/self-study/cs-study.git (push)
```

4. `fetch` 명령어를 사용하여 최신 버전으로 업데이트한다.

```bash
$ git fetch upstream master
remote: Enumerating objects: 31, done.
remote: Counting objects: 100% (31/31), done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 31 (delta 3), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (31/31), 12.23 KiB | 36.00 KiB/s, done.
From https://lab.ssafy.com/self-study/cs-study
 * branch            master     -> FETCH_HEAD
 * [new branch]      master     -> upstream/master
```

5. `master`로 체크아웃 후, `master`와 `upstream`을 merge

```bash
// master 체크아웃
$ git checkout master

// 브랜치 merge
$ git merge upstream/master
hint: Waiting for your editor to close the file...       1 [sig] bash 552! sigpacket::process: Suppressing signal 18 to win32 process (pid 2608)
1124376 [sig] bash 552! sigpacket::process: Suppressing signal 18 to win32 process (pid 2608)
Merge made by the 'recursive' strategy.
 ...355\205\234\354\235\230-\352\265\254\354\241\260.md" |  4 ++--
 ...\355\224\204\353\241\234\354\204\270\354\212\244.md" |  2 +-
 ...353\252\250\353\246\254-\352\264\200\353\246\254.md" |  8 ++++----
 ...\353\266\200\353\266\204\354\210\234\354\204\234.md" |  2 +-
 .../readme.md"                                          |  4 ++--
 .../readme.md"                                          |  4 ++--
 ...354\202\260\354\210\240-\354\227\260\354\202\260.md" |  7 +++----
 ...354\266\234\353\240\245-\352\265\254\354\241\260.md" |  9 +++------
 ...353\252\250\353\246\254-\352\265\254\354\241\260.md" |  7 +++----
 ...\352\260\225\354\235\230\354\206\214\352\260\234.md" | 16 +++++-----------
 ...354\247\200\355\204\270-\353\266\200\355\222\210.md" | 11 +++--------
 ...355\204\260\354\235\230-\355\221\234\355\230\204.md" |  9 +++------
 ...355\201\254\353\241\234-\354\227\260\354\202\260.md" |  7 ++-----
 ...1\260\354\231\200-\354\204\244\352\263\204-Part1.md" | 17 ++++-------------
 ...1\260\354\231\200-\354\204\244\352\263\204-Part2.md" | 15 +++++++--------
 ...\353\241\234\352\267\270\353\236\230\353\260\215.md" | 13 ++-----------
 ...\355\224\204\353\241\234\352\267\270\353\236\250.md" |  5 ++---
 ...354\262\230\353\246\254-\354\236\245\354\271\230.md" | 11 ++---------
 ...353\262\241\355\204\260-\354\262\230\353\246\254.md" |  7 +++----
 .../readme.md"                                          |  2 +-
 20 files changed, 55 insertions(+), 105 deletions(-)
```

## 참고 사이트

[[Git] Fork 한 repository 최신으로 동기화하기](https://json.postype.com/post/210431)
