import { Game } from './Game';

describe('Game Entity', () => {
  it('should create a game entity with default values', () => {
    const game = new Game({
      name: 'My Game',
      description: 'This is a test game',
      masterId: 1,
    });

    expect(game.createdAt).toBeInstanceOf(Date);
    expect(game.updatedAt).toBeNull();
    expect(game.name).toBe('My Game');
    expect(game.description).toBe('This is a test game');
    expect(game.imageUrl).toBeNull();
    expect(game.isActive).toBe(true);
    expect(game.totalPlayers).toBe(0);
    expect(game.activePlayers).toBe(0);
    expect(game.masterId).toBe(1);
    expect(game.inviteCode).toBe('');
  });

  it('should update game properties', () => {
    const game = new Game({
      name: 'My Game',
      description: 'This is a test game',
      masterId: 1,
    });

    const newName = 'New Game Name';
    const newDescription = 'Updated description';
    const newImageUrl = 'http://example.com/image.png';
    const newIsActive = false;
    const newTotalPlayers = 10;
    const newActivePlayers = 5;
    const newMasterId = 2;

    game.name = newName;
    game.description = newDescription;
    game.imageUrl = newImageUrl;
    game.isActive = newIsActive;
    game.totalPlayers = newTotalPlayers;
    game.activePlayers = newActivePlayers;
    game.masterId = newMasterId;

    expect(game.name).toBe(newName);
    expect(game.description).toBe(newDescription);
    expect(game.imageUrl).toBe(newImageUrl);
    expect(game.isActive).toBe(newIsActive);
    expect(game.totalPlayers).toBe(newTotalPlayers);
    expect(game.activePlayers).toBe(newActivePlayers);
    expect(game.masterId).toBe(newMasterId);
    expect(game.updatedAt).toBeInstanceOf(Date);
  });
});
