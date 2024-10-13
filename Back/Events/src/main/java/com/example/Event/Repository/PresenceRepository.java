package com.example.Event.Repository;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Presence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PresenceRepository  extends JpaRepository<Presence,Integer>{
}

