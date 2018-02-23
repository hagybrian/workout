module.exports = function(sequelize, DataTypes) {
    var workout = sequelize.define("workout", {
        // Giving the workout model a name of type STRING
        name: DataTypes.STRING
    });

    workout.associate = function(models) {
        // Associating workout with Posts
        // When an workout is deleted, also delete any associated Posts
        workout.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return workout;
};