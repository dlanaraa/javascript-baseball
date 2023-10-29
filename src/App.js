import { Console, Random } from "@woowacourse/mission-utils";

const MESSAGE = {
  start: "숫자 야구 게임을 시작합니다.",
  end: "3개의 숫자를 모두 맞히셨습니다! 게임 종료",
  continue: "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
  input: "숫자를 입력해주세요 : ",
  nothing: "낫싱",
  error: "[ERROR] 입력값이 유효하지 않습니다.",
  strike: (count) => `${count}스트라이크`,
  ball: (count) => `${count}볼`,
};

class App {
  async play() {
    Console.print(MESSAGE.start);
    let isKeepPlaying = true;

    while (isKeepPlaying) {
      const targetNumber = this.generateRandomNumber();
      await this.game(targetNumber);
      isKeepPlaying = await this.askForGameRestart();
    }
  }
}

const appp = new App();
app.play()
