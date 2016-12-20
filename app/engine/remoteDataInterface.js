import store from './store';
import moment from 'moment';

class RemoteDataInterface {
  
    static movie(movie) {

    	const year = moment(movie.release_date).format("YYYY");

        return {
            id: movie.id,
            imagePath: movie.image,
            name: movie.value,
            year: year === 'Invalid date' ? 'n/a' : year,
        };
    }

    static user(user) {
        return {
            id: user.id,
            name: user.value,
        };
    }

    static actor(actor) {
        return {
            id: actor.id,
            imagePath: actor.image,
            name: actor.value,
        };
    }

    static getMatch(match, state) {

    	// Assign the players to either user or opponent
    	const assignedPlayers = RemoteDataInterface.assignPlayers({
			players: match.players,
			user: state.user
		});

    	// Build a new match data object
    	const matchData = {
			id: match._id,
			actor: match.actor,
			status: match.status,
			started: moment(match.createdAt).fromNow(),
			lastPlayed: moment(match.lastPlayed).fromNow(),
			showSearch: false,
			chat: {
				// newMessageCount: RemoteDataInterface.getNewChatMessageCount(match.chat, state.user.id, state.match.chat),
				history: RemoteDataInterface.processChatHistory(match.chat, state.user.id),
			},
			players: assignedPlayers,
			...RemoteDataInterface.getAnswerData(match),
		}

		if (matchData.players.user.status === 'current') {
			matchData.showSearch = true;
		}

		return matchData;
    }

    static getNewChatMessageCount(messages = [], userId, chat) {
    	return messageCount = messages.filter(chatMessage => {
    			const isOpponentMessage = userId !== chatMessage.user;
	    		return isOpponentMessage && moment(chatMessage.timestamp).isAfter(chat.lastActivity);
    	}).length
    }

    static getPlayer(playerId, players) {
    	return players.filter(player => player.user._id === playerId)[0].user;
    }

    static processChatHistory(messages = [], userId) {
    	return messages.map(chatMessage => {
    		return {
    			message: chatMessage.message,
    			user: chatMessage.user,
    			timestamp: moment(chatMessage.timestamp).calendar(),
    		}
    	})
    }

    static assignPlayers({players, user}) {

    	const assignedPlayers = {};

		players.forEach(player => {
			const playerType = player.user._id === user.id ? 'user' : 'opponent';

			assignedPlayers[playerType] = Object.assign({}, player, {
				user: {
					name: player.user.name,
					id: player.user._id,
				}
			});
		});

		return assignedPlayers;
	}

	static getAnswerData(match) {

			if (!match.answers) {
				return;
			}

			const formattedAnswers = [];
			let lastAnswer = false;
			let selectedAnswerCount = 0;

			match.answers.forEach(answer => {
				const formattedAnswer = {
					id: answer._id,
					remoteId: answer.remote_id,
					year: moment(answer.release_date).format('YYYY'),
				}	

				if (answer.selected) {
					Object.assign(formattedAnswer, {
						selected: answer.selected,
						title: answer.title,
						imagePath: answer.poster_path,
						selectedBy: RemoteDataInterface.getPlayer(answer.selectedBy, match.players),
						selectionIndex: answer.selectionIndex,
						overview: answer.overview,
					})

					if(!lastAnswer || answer.selectionIndex >= lastAnswer.selectionIndex) {
						lastAnswer = formattedAnswer;
					}

					selectedAnswerCount++;
				} else if (match.status === 'inactive') {
					Object.assign(formattedAnswer, {
						imagePath: answer.poster_path,
					})
				}

				formattedAnswers.push(formattedAnswer);
			})

			return {
				answers: formattedAnswers,
				lastAnswer: lastAnswer,
				totalAnswerCount: match.answers.length,
				selectedAnswerCount: selectedAnswerCount,
				answerCompletionPercentage: Math.floor((selectedAnswerCount/match.answers.length)*100)
			}
		}

  
}

export default RemoteDataInterface;