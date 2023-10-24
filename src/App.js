import { Console, Random } from "@woowacourse/mission-utils";

const MESSAGE = {
  start: "숫자 야구 게임을 시작합니다.",
  end: "3개의 숫자를 모두 맞히셨습니다! 게임 종료",
  continue: "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
  input: "숫자를 입력해주세요 : ",
  nothing: "낫싱",
  strike: (count) => `${count}스트라이크`,
  ball: (count) => `${count}볼`,
  error: (message) => `[ERROR] ${message}`,
};

class App {
  async play() {
    Console.print(MESSAGE.start);
    let isKeepPlaying = true;
    while (isKeepPlaying) {
      const answer = this.generateRandomNumber();
      await this.game(answer);

      while (true) {
        const input = (await Console.readLineAsync(MESSAGE.continue)).trim();
        if (input === "1") break;
        if (input === "2") {
          isKeepPlaying = false;
          break;
        }
      }
    }
  }

  async game(answer) {
    while (true) {
      const input = await Console.readLineAsync("숫자를 입력해주세요 : ");

      const isValidInput = this.validateInput(input);
      if (!isValidInput) {
        throw new Error(MESSAGE.error("입력값이 유효하지 않습니다."));
      }

      const { strike, ball } = this.countPitchResult(input, answer);
      const output = this.outputPitchResult(strike, ball);
      Console.print(output);

      if (strike === 3) {
        Console.print(MESSAGE.end);
        break;
      }
    }
  }

  generateRandomNumber() {
    let result = "";

    while (true) {
      if (result.length >= 3) break;
      const random = Random.pickNumberInRange(1, 9);
      if (!result.includes(random)) result += random;
    }

    return result;
  }

  countPitchResult(input, answer) {
    let strike = 0;
    let ball = 0;

    if (input === answer) {
      strike = 3;
    } else {
      for (let i = 0; i < input.length; i++) {
        if (input[i] === answer[i]) {
          strike++;
        } else if (answer.includes(input[i])) {
          ball++;
        }
      }
    }

    return {
      strike,
      ball,
    };
  }

  outputPitchResult(strike, ball) {
    let result = [];

    if (ball > 0) result.push(MESSAGE.ball(ball));
    if (strike > 0) result.push(MESSAGE.strike(strike));
    if (result.length === 0) result.push(MESSAGE.nothing);

    return result.join(" ");
  }
  validateInput(input) {
    const regEx = new RegExp("^(?!.*(\\d).*\\1)[1-9]{3}$");

    return regEx.test(input);
  }
}

const app = new App();
app.play();

export default App;
