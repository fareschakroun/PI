package tn.esprit.auction.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import tn.esprit.auction.DTO.RouletteDTO;

public interface RouletteInterface {


    public void sendToRoulette(RouletteDTO rouletteDTO) throws JsonProcessingException;

    public void startRoulette() throws JsonProcessingException;

    public void sendRandom(Long roomid) throws JsonProcessingException;
}
