<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Post extends Model
{
    use HasFactory, HasApiTokens;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'post_id'; // Specify the new primary key column name
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true; // Set to true if `post_id` is auto-incrementing

    /**
     * The type of the auto-incrementing ID.
     *
     * @var int
     */
    protected $keyType = 'int'; // Use 'int' if `post_id` is an integer field
    protected $fillable = [
        'title',
        'content',
        'user_id',
        'like_id',
        'image',
        'comment_id',
        'retweet_id'
    ];
    /**
     * Get the user who owns the post.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    /**
     * One post can have many comments.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
    /**
     * One post can have many likes.
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, 'post_id');
    }
    /**
     * One post can have many retweets.
     */
    public function retweets(): HasMany
    {
        return $this->hasMany(Retweet::class, 'post_id');
    }
}
