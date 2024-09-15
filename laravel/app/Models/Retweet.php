<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Retweet extends Model
{
    use HasFactory, HasApiTokens;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'retweet_id'; // Specify the new primary key column name
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true; // Set to true if `retweet_id` is auto-incrementing

    /**
     * The type of the auto-incrementing ID.
     *
     * @var int
     */
    protected $keyType = 'int'; // Use 'int' if `retweet_id` is an integer field
    protected $fillable = ['retweet_id', 'post_id', 'user_id'];
    /**
     * Get the post that owns the retweet.
     */
    public function posts(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    /**
     * Get the user that owns the retweet.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
