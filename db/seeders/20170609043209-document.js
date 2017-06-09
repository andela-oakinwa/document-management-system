module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'Rohan King Quote',
        ownerId: 1,
        access: 'public',
        content: `Where now are the horse and the rider?
        Where is the horn that was blowing?`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'King of Gondor',
        ownerId: 2,
        access: 'public',
        content: `Sons of Gondor! Of Rohan! My brothers!
        I see in your eyes the same fear that would take the heart of me!
        A day may come when the courage of men fails,
        when we forsake our friends and break all bonds of fellowship.
        But it is not this day.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Insomnia',
        ownerId: 2,
        access: 'public',
        content: `Insomnia may be characterized based on its duration.
        Acute insomnia is brief and often happens because of life circumstances
        (for example, when you can't fall asleep the night before an exam,
        or after receiving stressful or bad news).
        Many people may have experienced this type of passing sleep disruption,
        and it tends to resolve without any treatment.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true, validate: true }
    );
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
