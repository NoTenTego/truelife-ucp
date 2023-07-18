import { db } from "../connect.js";

export const getTopMoney = (req, res) => {
    const q = "SELECT id, charactername, age, bankmoney FROM postacie ORDER BY bankmoney DESC LIMIT 10"

    db.query(q, (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const getTopActivity = (req, res) => {
    const q = "SELECT username, hours FROM konta ORDER BY hours DESC LIMIT 10"

    db.query(q, (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const getTopFactions = (req, res) => {
    const q = "SELECT factions.name, factions.bankbalance, (SELECT COUNT(*) FROM postacie WHERE postacie.faction_id = factions.id) AS postacie_count FROM factions ORDER BY postacie_count DESC LIMIT 10"

    db.query(q, (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const getTopBusinesses = (req, res) => {
    const q = "SELECT biznesy.name, biznesy.balance, (SELECT COUNT(*) FROM biznesy_pracownicy WHERE biznesy_pracownicy.bid = biznesy.id) AS postacie_count FROM biznesy ORDER BY postacie_count DESC LIMIT 10"

    db.query(q, (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const getServerStats = (req, res) => {
    const q = `SELECT
        (SELECT COUNT(*) FROM konta) AS count_of_accounts,
        (SELECT COUNT(*) FROM postacie) AS count_of_characters,
        (SELECT COUNT(*) FROM pojazdy) AS count_of_vehicles,
        (SELECT COUNT(*) FROM nieruchomosci) AS count_of_interiors,
        (SELECT COUNT(*) FROM items) AS count_of_items,
        (SELECT COUNT(*) FROM factions WHERE type>1) AS count_of_factions,
        (SELECT COUNT(*) FROM biznesy) AS count_of_businesses,
        (SELECT COUNT(*) FROM factions WHERE type=0 OR type=1) AS count_of_op;`

    db.query(q, (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}