# vim 단축키

## 파일 열기

```
vim/vi 파일이름.파일확장자

vim hello.txt
vi hello.txt
```

## 입력 모드로 전환하기

- vim에는 일반모드 / 입력모드 / 명령모드 3개가 존재
- 처음 파일을 열면 일반모드라 수정을 할 수 없음
- `a`, `i`, `s`, `o` 를 눌러 입력 모드로 전환

![입력 모드](https://user-images.githubusercontent.com/25563077/180340395-73df9618-9595-4430-ac1c-2d938a6aeeb7.png)

- vim 에디터 하단이 `--INSERT--`로 변경되면 입력 모드에 진입한 것

## 명령 모드로 전환하기

- `ESC` 를 누른 후 `:`을 입력하여 명령어를 입력합니다.

## 저장하기

```
:w
```

## 종료하기

```
:q
```

## 강제 종료하기

```
:q!
```

## 저장하면서 종료하기

```
:wq 또는 wq!
```

## vim 수정을 하려는데 `readonly`라고 수정이 안됩니다 ㅠㅠ

```
sudo vim hello.text
```

- `sudo` 옵션을 사용해서 문서를 열어 봅시다.

## References

- [왕초보를 위한 vim 사용방법](https://zeddios.tistory.com/122)
