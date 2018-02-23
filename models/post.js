module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        section: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sequence: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        exercise: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        sets: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        reps: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        tempo: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        rest: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.workout, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};