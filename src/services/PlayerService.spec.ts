import PlayerRepository from "@/repositories/PlayerRepository";
import PlayerService from "./PlayerService";

import { Mock, Times } from "moq.ts";

describe("with player service", () => {
  const mockRepository = new Mock<PlayerRepository>();

  let Subject: PlayerService;

  beforeEach(async () => {
    Subject = await PlayerService.get(mockRepository.object());
  });

  describe("when creating a player", () => {
    let result: { id: string; userId: string };

    beforeEach(async () => {
      mockRepository
        .setup((x) => x.createPlayer("123456"))
        .returnsAsync({ id: "abcd", userId: "123456" });
      Subject = await PlayerService.get(mockRepository.object());
      result = await Subject.createPlayer("123456");
    });

    it("calls the correct function in the repo", () => {
      mockRepository.verify((x) => x.createPlayer("123456"), Times.Once());
      expect(result).toEqual({ id: "abcd", userId: "123456" });
    });
  });
});
